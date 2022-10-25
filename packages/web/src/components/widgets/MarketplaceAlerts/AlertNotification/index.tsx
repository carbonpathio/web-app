import classNames from 'classnames'
import { parseISO, formatDistanceToNow } from 'date-fns'

type Props = {
  isRead: boolean
  notifBody: string
  notifDate: string  // ISO 8601
}

const AlertNotification: React.FC<Props> = ({isRead, notifBody, notifDate}) => {
  return (
    <>
      <div className="flex flex-row justify-start w-full">
        <div className="h-full my-auto mr-4">
          <div
            className={classNames(
              'h-2 w-2 rounded-full',
              isRead ? 'bg-[#E7E7E7]' : 'bg-carbon-path-bluegrey'
            )}
          />
        </div>
        <div className="flex flex-col flex-wrap break-words justify-start w-full font-lato">
          <div className="w-3/4 font-bold text-[16px] leading-5 text-[#333333] pb-1">{notifBody}</div>
          <div className="font-medium text-[12px] leading-5 text-[#606060] pb-3">{formatDistanceToNow(parseISO(notifDate))}</div>
          <hr className='w-full'/>
        </div>
      </div>
    </>
  )
}

export default AlertNotification
