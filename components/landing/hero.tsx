import { Button } from "./button";

function Hero() {
  return (
    <div className="h-screen bg-cover bg-center" style={{
      backgroundImage: `url('/coverPage.png')`,
      
      }}>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-8 py-12 pt-4 lg:px-12 lg:py-24">
        <div className="mx-auto mb-8 max-w-2xl py-8 sm:py-8 lg:py-8">
          <div className="hidden sm:flex sm:justify-center"></div>
          <div className="mt-2 text-center">
            <h1 className="text-4xl font-black tracking-tight text-slate-800 sm:text-6xl">
            All your Focus on Teaching,
            <br/> We will Handle the Rest!
            </h1>
            <p className="mt-6 text-base font-light leading-8 text-secondary-foreground text-slate-500 sm:text-lg">
              AI-Powered Assissting tools, to make your teaching journey seamless.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-y-6">
              <Button
                color="blue"
                href={"/dashboard"}
                className="h-12 w-64 rounded-md"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        {/* <TestimonialsAvatars priority={true} /> */}
      </div>
    </div>
  );
}

export default Hero;
