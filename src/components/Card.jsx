import starryNight from '../assets/starry-night.jpg';

const Card = () => {
    return (
        <>
            <div className="flex flex-col items-center p-6 max-w-sm mx-auto bg-white rounded-xl shadow-xl hover:shadow-purple-500/50 space-y-4">
                <img className="w-32 h-32 rounded-full" src={starryNight} alt="The Starry Night" />
                <div className="text-center space-y-2">
                    <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">The Starry Night Frame</p>
                        <p className="text-gray-500 font-medium">Rs. 500</p>
                    </div>
                    <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Check-Out</button>
                </div>
            </div>
        </>
    )
}

export default Card;