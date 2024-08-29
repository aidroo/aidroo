export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div className="h-44 mx-auto border rounded-md w-full" key={item}>
          <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>{" "}
            <div className="flex flex-col space-y-3">
              <div className="h-6 bg-gray-300 rounded-md w-36"></div>
              <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
