import SVGComponent from "./SVGComponent";
import ButonMode from "./BotonMode";

export const Footer = () => {
  return (
    <div
      className="
        px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8
         dark: transition-colors duration-500
      "
    >
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <SVGComponent percental={"20%"} />
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-800 dark:!text-gray-400">
              OPENLAB Uninorte es una iniciativa que expone los proyectos
              desarrollados por estudiantes de la Universidad del Norte.
            </p>
            <p className="mt-4 text-sm text-gray-800 dark:text-gray-400">
              Este proyecto fue realizado en el marco académico del semestre
              2025-1, promoviendo la innovación y el aprendizaje práctico.
            </p>
            <ButonMode />
          </div>
        </div>

        {/* Resto igual, pero recuerda agregar dark: a los textos */}
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-300">
            Desarrolladores
          </p>
          <div className="flex">
            <p className="mr-1 text-gray-800 dark:text-gray-400">
              Cristian Cubillos:
            </p>
            <a
              href="https://github.com/CUBILLOSCRISTIAN"
              aria-label="Github"
              title="Ir a github"
              className="transition-colors duration-300 text-teal-accent-400 hover:text-teal-accent-700"
            >
              200124676
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800 dark:text-gray-400">
              Carlos Avendaño:
            </p>
            <a
              href="https://github.com/CUBILLOSCRISTIAN"
              aria-label="Github"
              title="Ir a github"
              className="transition-colors duration-300 text-teal-accent-400 hover:text-teal-accent-700"
            >
              200064111
            </a>
          </div>

          <div className="flex">
            <p className="mr-1 text-gray-800 dark:text-gray-400">
              Nilson Diaz:
            </p>
            <a
              href="https://github.com/CUBILLOSCRISTIAN"
              aria-label="Github"
              title="Ir a github"
              className="transition-colors duration-300 text-teal-accent-400 hover:text-teal-accent-700"
            >
              200124768
            </a>
          </div>
        </div>

        <div>
          <span className="text-base font-bold tracking-wide text-gray-900 dark:text-gray-300">
            Social
          </span>
          <div className="flex items-center mt-1 space-x-3">
            {/* Iconos sociales con clases text-gray-500 y dark:text-gray-400 */}
            <a
              href="/"
              className="text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-teal-accent-400"
            >
              {/* SVG icon */}
            </a>
            {/* Repetir para demás iconos */}
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Bacon ipsum dolor amet short ribs pig sausage prosciutto chicken
            spare ribs salami.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t border-gray-200 dark:border-gray-700 lg:flex-row">
        <p className="text-sm text-gray-600 dark:text-gray-400">© Copyright.</p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-teal-accent-400">
              F.A.Q
            </a>
          </li>
          <li>
            <a className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-teal-accent-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-teal-accent-400">
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
