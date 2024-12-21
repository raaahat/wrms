import { SignIn } from '@clerk/nextjs';
export default function Page() {
  return (
    <div className='flex flex-col w-full justify-center items-center my-auto h-screen bg-gray-800 text-white'>
      <div className='text-6xl font-extrabold relative inline-block'>
        <span
          className='absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 blur-lg'
          aria-hidden='true'
        ></span>
        <span className='relative'>
          <span className='inline-block transform transition-transform duration-500 hover:scale-125'>
            W
          </span>
          <span className='inline-block transform transition-transform duration-500 hover:scale-125'>
            R
          </span>
          <span className='inline-block transform transition-transform duration-500 hover:scale-125'>
            M
          </span>
          <span className='inline-block transform transition-transform duration-500 hover:scale-125'>
            S
          </span>
        </span>
      </div>
      <div className='mt-6'>
        <SignIn />
      </div>
    </div>
  );
}
