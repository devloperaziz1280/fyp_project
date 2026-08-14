import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { MdDeleteOutline } from 'react-icons/md'
import { deleteApartment } from '@/services/blockchain'
import { toast } from 'react-toastify'

const Actions = ({ apartment }) => {
  const navigate = useRouter()
  const { address } = useAccount()

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete Apartment ${apartment?.id}?`)) {
      await toast.promise(
        new Promise(async (resolve, reject) => {
          await deleteApartment(apartment?.id)
            .then(async () => {
              navigate.push('/')
              resolve()
            })
            .catch(() => reject())
        }),
        {
          pending: 'Approve transaction...',
          success: 'Apartment deleted successfully 👌',
          error: 'Encountered error 🤯',
        }
      )
    }
  }

  if (!apartment?.id || address !== apartment?.owner) return null

  return (
    <div className="flex justify-start items-center space-x-3 border-b-2 border-b-slate-200 pb-6">
      <button
        className="p-2 rounded-md shadow-lg border-[0.1px]
          border-[#7c3aed] flex justify-start items-center space-x-1
          bg-[#7c3aed] hover:scale-110 transition-transform duration-500 hover:bg-transparent hover:text-[#7c3aed] text-white"
        onClick={handleDelete}
      >
        <MdDeleteOutline size={15} />
        <small>Delete</small>
      </button>
    </div>
  )
}

export default Actions
