import type { Project } from "../../domain/entities/Project";
import CommentSection from "./CommentSection";
import { Statistic } from "./Statistic";

interface ContentProps {
  project: Project;
}

export const Content = ({ project }: ContentProps) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            {project.tags.join(", ")}
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="2feffae2-9edf-414e-ab8c-f0e6396a0fc1"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#2feffae2-9edf-414e-ab8c-f0e6396a0fc1)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative"> {project.title}</span>
            <div className="mt-5 grid grid-cols-2 row-gap-8 md:grid-cols-2">
              <Statistic label={"Likes"} value={4} />
              <Statistic label={"Comments"} value={12} />
            </div>
          </span>
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          {project.description}
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-64 h-64">
          <img
            className="object-cover w-full h-full rounded shadow-lg"
            src={project.thumbnailUrl}
            alt=""
          />
        </div>
      </div>

      <CommentSection
        comments={[]}
        onSubmitComment={function (text: string): void {
          console.log("New comment submitted:", text);
        }}
      />
    </div>
  );
};
