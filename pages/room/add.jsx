import { useEffect, useRef, useState } from 'react'
import { FaCloudUploadAlt, FaSpinner, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { createApartment } from '@/services/blockchain'
import { uploadToPinata } from '@/utils/uploadToPinata'

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export default function Add() {
  const { address } = useAccount()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [rooms, setRooms] = useState('')
  const [price, setPrice] = useState('')
  const [links, setLinks] = useState([])
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useRouter()

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !location || !description || !rooms || links.length != 5 || !price) return

    const params = {
      name,
      description,
      location,
      rooms,
      images: links.slice(0, 5).join(','),
      price,
    }

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await createApartment(params)
          .then(async () => {
            navigate.push('/')
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Apartment added successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const removeImage = (index) => {
    links.splice(index, 1)
    setLinks(() => [...links])
  }

  const clearPreview = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage)
    }
    setPreviewImage(null)
  }

  const validateImage = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return false
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Image must be smaller than 5MB')
      return false
    }

    if (links.length >= 5) {
      toast.error('Maximum 5 images allowed')
      return false
    }

    return true
  }

  const handleFileUpload = async (file) => {
    if (!file || uploading || links.length >= 5) return
    if (!validateImage(file)) return

    clearPreview()
    const preview = URL.createObjectURL(file)
    setPreviewImage(preview)
    setUploading(true)

    try {
      const url = await uploadToPinata(file)
      setLinks((prevState) => [...prevState, url])
      toast.success('Image uploaded successfully')
      clearPreview()
    } catch (error) {
      toast.error(error.message || 'Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    handleFileUpload(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    handleFileUpload(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (!uploading && links.length < 5) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const openFilePicker = () => {
    if (!uploading && links.length < 5) {
      fileInputRef.current?.click()
    }
  }

  const uploadDisabled = uploading || links.length >= 5

  return (
    <div className="h-screen flex justify-center mx-auto">
      <div className="w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-center items-center">
            <p className="font-semibold text-black">Add Room</p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="name"
              placeholder="Room Name "
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (ETH)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="mt-5 space-y-3">
            {previewImage && (
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                <img
                  src={previewImage}
                  alt="Selected preview"
                  className="h-48 w-full object-cover"
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <FaSpinner className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
              </div>
            )}

            <div
              onClick={openFilePicker}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 transition-all duration-200 ${
                uploadDisabled
                  ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60'
                  : isDragging
                    ? 'border-[#7c3aed] bg-purple-50'
                    : 'border-gray-300 bg-white hover:border-[#7c3aed] hover:bg-purple-50/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploadDisabled}
                className="hidden"
              />

              {uploading ? (
                <div className="flex flex-col items-center gap-3 text-[#7c3aed]">
                  <FaSpinner className="h-8 w-8 animate-spin" />
                  <p className="text-sm font-medium">Uploading to Pinata...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#7c3aed] to-[#9b5cff] text-white shadow-md">
                    <FaCloudUploadAlt className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    {links.length >= 5 ? 'Maximum images reached' : 'Drag & drop an image here'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {links.length >= 5
                      ? 'Remove an image to upload another'
                      : 'or click to browse • PNG, JPG, GIF up to 5MB'}
                  </p>
                </div>
              )}
            </div>

            {links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map((link, i) => (
                  <div
                    key={i}
                    className="group relative h-20 w-20 overflow-hidden rounded-xl border border-gray-200 shadow-sm"
                  >
                    <img src={link} alt={`Uploaded ${i + 1}`} className="h-full w-full object-cover" />
                    <button
                      onClick={() => removeImage(i)}
                      type="button"
                      disabled={uploading}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:cursor-not-allowed"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-500">{links.length}/5 images uploaded</p>
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="location"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            />
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="rooms"
              placeholder="Number of room"
              onChange={(e) => setRooms(e.target.value)}
              value={rooms}
              required
            />
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Room Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`flex flex-row justify-center items-center
            w-full text-white font-bold text-md bg-[#7c3aed]
            py-2 px-5 rounded-full drop-shadow-xl hover:bg-white
            border-transparent border
            hover:hover:text-[#7c3aed]
            hover:border-[#7c3aed]
            mt-5 transition-all duration-500 ease-in-out ${
              !address ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!address}
          >
            Add Appartment
          </button>
        </form>
      </div>
    </div>
  )
}
