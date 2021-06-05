function ThumbDown({ className = "" }) {
  return (
    <button className={`bg-[#f9ad1d] p-2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
        width="16"
        height="16">
        <path
          fill="#FFF"
          fillRule="evenodd"
          d="M12.604 8.893c-1.937 2.698-2.625 3.468-2.51 5.03.115 1.562-.214 1.992-.994 2.068-.781.077-2.247-.325-2.505-2.882-.11-1.107.725-3.285.725-3.285l-5.844-.003C.648 9.821 0 9.486 0 8.42c0-1 1.169-1.3 1.169-1.3A1.197 1.197 0 01.42 6c-.002-.677.575-1.23 1.292-1.237-.49-.186-.77-.677-.667-1.167.09-.587.57-1.052 1.189-1.15a1.025 1.025 0 01-.411-1.206C2.085.654 2.778.008 4.333.008H11.6c.433-.052.852.161 1.046.53v8.028c.003.11-.011.22-.042.327zM16 9.409h-2.843v-9.4H16v9.4z"></path>
      </svg>
    </button>
  );
}

export default ThumbDown;
