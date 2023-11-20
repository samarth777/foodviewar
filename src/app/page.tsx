import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="flex flex-row items-center justify-center mt-10">
        <div className="p-10 text-center">
          <Image src="/1.png" alt="Image" width={280} height={280} />
          <h2 className="text-2xl font-semibold mt-10">Experience Your Food</h2>
          <p className="text-sm font-normal mt-4">
            See your food on the table using augmented reality, even before you order it.
          </p>
        </div>
        <div className="p-10 text-center">
          <Image src="/2.png" alt="Image" width={280} height={280} />
          <h2 className="text-2xl font-semibold mt-10">Blazing Fast Orders</h2>
          <p className="text-sm font-normal mt-4">
            No waiting time. Scan a QR code, place your order. Done.
          </p>
        </div>
        <div className="p-10 text-center">
          <Image src="/3.png" alt="Image" width={280} height={280} />
          <h2 className="text-2xl font-semibold mt-10">Easy As Pie</h2>
          <p className="text-sm font-normal mt-4">
            Pay for your food with the tap of a button. Split bills with your friends and enjoy crazy discounts.
          </p>
        </div>
      </div>
      <button className="bg-gray-800 text-white font-semibold rounded-lg p-5 m-12 py-2 mt-10">Get Started</button>
    </main>
  );
}