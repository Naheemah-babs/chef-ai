import { Blocks } from 'react-loader-spinner'

export function Loading() {
  return (
    <>
     <section className='suggested-recipe-container' aria-live='polite'>
            <Blocks
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
            <p>Please wait while your chef cooks up your menu </p>
     </section>
    </>
  )
}