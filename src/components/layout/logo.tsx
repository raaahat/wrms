import Image from 'next/image';

export const Logo = () => {
  return (
    <div className='flex items-center'>
      <Image
        src='logo.svg'
        alt=''
        className='size-8 mr-4'
        width={20}
        height={20}
      />
      <p className='font-bold text-2xl'>WRS</p>
    </div>
  );
};
