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
    const init = () => {
      var easyMDE = new EasyMDE({element: document.getElementById('mde')});
    };
    return (
    <div class="container w-full mx-auto pt-20 justify-center max-w-6xl">
        <div class="relative w-full bg-white mt-10 flex md:mt-12 text-gray-800 leading-normal">
          <div class="w-full">
            <textarea oncreate={init} id="mde"></textarea>
          </div>
        </div>
    </div>  
    )  
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




