/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

export default function NewsComponent({ item }) {
  const { title, pubDate, author, content, categories, link } = item;

  return (
    <div className="flex flex-col py-4 md:py-6 min-h-[180px] gap-2 flex-wrap bg-gray-100 rounded-lg shadow-sm px-4 md:px-6">
      {/* Title */}
      <div className="text-base md:text-xl lg:text-2xl font-bold">
        <h1>{title}</h1>
      </div>

      {/* Date, Author, and Categories */}
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-5 items-start sm:items-center flex-wrap">
        <p className="text-xs sm:text-sm text-blue-500 font-semibold">
          <span className="text-black mr-1">Date: </span>{pubDate}
        </p>
        <p className="text-xs sm:text-sm text-amber-500 font-semibold">
          <span className="text-black mr-1">Author: </span>{author}
        </p>
        <p className="text-xs sm:text-sm flex gap-1 text-blue-800">
          Categories:
          <div className="flex gap-2 items-center text-teal-500">
           <p>{categories[0]}</p>
           <p>{categories[1]}</p>
           <p>{categories[2]}</p>
          </div>
        </p>
      </div>

      {/* Content and Link */}
      <div>
        <p className="text-xs sm:text-sm md:text-base">
          {content.substring(0, 200)}...{' '}
          <a href={link} className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </p>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-slate-300 mt-4"></div>
    </div>
  );
}
