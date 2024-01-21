export default function Error(props: { err: Error }) {
  return (
    <div>
      <div class="relative">
        <div class="fixed  inset-0 bg-[url('https://images.nightcafe.studio/jobs/EoF98kWG8Jm7TNJOinVz/EoF98kWG8Jm7TNJOinVz--1--28ig0_6.9444x.jpg?tr=w-1600,c-at_max')] bg-cover bg-center">
          <div class="relative bg-opacity-[50%] bg-black flex  justify-center h-screen">
            <div class="flex flex-col items-center    border-1  ">
              <h1 class="text-white text-4xl font-bold">
                Something went wrong :sob:
              </h1>
              <h1 class="text-white text-2xl p-[3em]">{props.err.message}</h1>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                reload page
              </button>
            </div>
          </div>
        </div>
      </div>
      <pre>{props.err.message}</pre>
      <a href="/">Go to home</a>
    </div>
  );
}
