import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

export default initial => ({
  state: {
    tasks: initial
  },
  actions: {
    increment: (evt) => state => ({ cat: 'meow' }),
  },
  view: (state, actions) => ({match}) => {
    return (
      <div>
      {

        <div class="container mx-auto min-h-screen">
          <section class="leading-tight py-6 px-4">
            <div class="bg-gray-700 text-white py-2 sm:w-5/6 sm:mx-auto">
              <header class="bg-cyan-300">
                <div class="container">
                    <div class="text-white font-serif text-center">
                        <h1 class="font-serif font-black text-5xl mb-2">Blog</h1>
                        <h2 class="font-light">The Communist Soapbox.</h2>
                    </div>
                </div>
              </header>     
            </div>
          </section>

        </div>
               
      }     
      </div>
    )
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




