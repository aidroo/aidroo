"use client";
export default function Error({ error }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-red-500 lg:text-9xl">
            500
          </h1>

          <p className="mb-4 text-lg font-light text-red-500 ">
            {error || " Sorry something went wrong"}.
          </p>
        </div>
      </div>
    </section>
  );
}
