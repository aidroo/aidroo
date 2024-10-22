export default function Separator() {
  return (
    <li className="clear-both py-4">
      <div className="relative mt-3 mb-6 text-center">
        <div className="before:content-['] before:absolute before:w-full before:h-[1px] before:left-0 before:right-0 before:bg-gray-50 before:top-[10px] dark:before:bg-zinc-600"></div>
        <span className="relative bg-gray-50 text-13 py-[6px] px-3 rounded dark:bg-zinc-600 dark:text-gray-50">
          Today
        </span>
      </div>
    </li>
  );
}
