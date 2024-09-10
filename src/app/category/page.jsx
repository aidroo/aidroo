import Layout from "@/components/Layout/Layout";
import { categories } from "@/constant";
import CategoryCard from "./_components/CategoryCard";

export default function page() {
  return (
    <Layout>
      <div className="max-w-[1360px] mx-auto sm:px-8 flex items-center flex-col space-y-6 mb-14">
        <h1 className="my-10 text-xl font-semibold text-gray-600 ">
          All Categories
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  w-full">
          {categories.map((category) => (
            <CategoryCard category={category} key={category?.name} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
