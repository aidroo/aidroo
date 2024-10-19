import Lottie from 'lottie-react'

export default function LottePlayer({className="",animationData="",loop=true}) {
  return (
    <div className={className}>
        <Lottie animationData={animationData} loop={loop} />
    </div>
  )
}
