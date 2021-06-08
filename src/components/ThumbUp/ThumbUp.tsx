import { ButtonHTMLAttributes } from "react";

interface ThumbDownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function ThumbUp({ className = "", ...props }: ThumbDownProps) {
  return (
    <button
      className={`bg-[#3cbbb4] p-2 ${className} focus:outline-none`}
      {...props}>
      <svg
        viewBox="0 0 36 36"
        className="w-4 h-4 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M7.64 15.992C12 9.919 13.547 8.189 13.289 4.674c-.258-3.515.48-4.482 2.237-4.655 1.757-.173 5.055.733 5.634 6.487.25 2.489-1.629 7.39-1.629 7.39l13.149.006c1.861 0 3.32.754 3.32 3.155 0 2.25-2.63 2.927-2.63 2.927 1.043.444 1.705 1.433 1.683 2.514.006 1.526-1.291 2.77-2.905 2.785 1.104.42 1.734 1.523 1.5 2.625-.2 1.322-1.282 2.369-2.675 2.589.912.61 1.29 1.715.926 2.714-.59 1.318-2.148 2.772-5.649 2.772H9.9c-.973.116-1.918-.363-2.353-1.194V16.727a2.441 2.441 0 01.093-.735zM0 14.83h6.396v21.148H0V14.83z"
          clipRule="evenodd"></path>
      </svg>
    </button>
  );
}

export default ThumbUp;
