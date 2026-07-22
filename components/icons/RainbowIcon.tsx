export default function RainbowIcon({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21v-9a9 9 0 1 0-18 0v9m15 0v-9a6 6 0 0 0-12 0v9m9 0v-9a3 3 0 1 0-6 0v9"
      />
    </svg>
    // <svg
    //   width={size}
    //   height={size}
    //   viewBox="0 0 24 24"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={className}
    //   aria-hidden="true"
    // >
    //   <path
    //     fill="currentColor"
    //     d="M23,17a1,1,0,0,1-2,0A9,9,0,0,0,3,17a1,1,0,0,1-2,0,11,11,0,0,1,22,0ZM12,10a7.008,7.008,0,0,0-7,7,1,1,0,0,0,2,0,5,5,0,0,1,10,0,1,1,0,0,0,2,0A7.009,7.009,0,0,0,12,10Zm0,4a3,3,0,0,0-3,3,1,1,0,0,0,2,0,1,1,0,0,1,2,0,1,1,0,0,0,2,0A3,3,0,0,0,12,14Z"
    //   />
    // </svg>
  );
}
