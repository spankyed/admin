import { h } from 'hyperapp'
import { Link, location } from "@hyperapp/router"

export default {
    state: {
      navToggle: false
    },
    actions: {
      toggle: (evt) => state => ({ navToggle: !state.navToggle }),
    },
    view: (state, actions) => ({path}) => {
        return (
            <div class="fixed w-full">
                <nav id="header" class="bg-gray-900 relative w-full z-10 top-0 shadow border border-gray-800 ">
                    <div class="w-full max-w-6xl container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-2 md:py-4">
                        <div class="w-full md:flex md:items-center lg:items-base">
                            <span class="px-8 flex md:inline md:px-0 md:mr-4 md:w-3/5 lg:w-2/5 md:max-w-sm">
                                <div class="w-5/6 md:w-full flex-auto relative pull-right pl-4 md:pr-0">
                                    <input type="search" placeholder="Search" class="w-full bg-gray-900 text-sm text-gray-400 transition border border-gray-800 focus:outline-none focus:border-gray-600 rounded py-1 px-2 pl-10 appearance-none leading-normal"></input>
                                    <div class="absolute search-icon" style="top: 0.375rem;left: 1.75rem;">
                                        <svg class="fill-current pointer-events-none text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="md:hidden w-1/6 flex-auto relative inline-block">
                                    {/* Nav Toggle */}
                                    <div class="block pr-4">
                                        <button onclick={actions.toggle} id="nav-toggle" class={`${state.navToggle && 'border-teal-500'} flex float-right items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-100 hover:border-teal-500 appearance-none focus:outline-none`}>
                                            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </span>
            
                            <div class={`${!state.navToggle && 'hidden'} md:inline md:visible w-full content-center text-left justify-between flex-grow md:flex md:items-center md:w-auto md:block mt-2 md:mt-0 bg-gray-900 z-20`}>
                                <ul class="list-reset w-full flex flex-row py-2 md:py-0 px-1 md:px-2 text-center">
                                    <Link to='/' class="mr-3 flex-1 md:flex-initial lg:flex-1">
                                        <a href="#" class={`${(path == '/') && 'border-pink-600'} block px-2 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500`}>
                                            <i class={`${(path == '/') && 'text-pink-600'} fas fa-home pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Home</span>
                                        </a>
                                    </Link>
                                    <Link to='/tasks' class="mr-3 flex-1 md:flex-initial lg:flex-1">
                                        <a href="#" class={`${(path == '/tasks') && 'border-green-600'} block px-2 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-green-500`}>
                                            <i class={`${(path == '/tasks') && 'text-green-600'} fas fa-tasks pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Tasks</span>
                                        </a>
                                    </Link>
                                    <li class="mr-3 flex-1 md:flex-initial lg:flex-1">
                                        <a href="#" class={`${(path == '/inbox') && 'border-red-600'} block px-2 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500`}>
                                            <i class={`${(path == '/inbox') && 'text-red-600'} fas fa-envelope pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Inbox</span>
                                        </a>
                                    </li>
                                    <Link to='/content' class="mr-3 flex-1 md:flex-initial lg:flex-1">
                                        <a href="#" class={`${(path == '/content') && 'border-yellow-600'} block px-2 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-yellow-500`}>
                                            <i class={`${(path == '/content') && 'text-yellow-600'} fas fa-pencil-alt pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Content</span>
                                        </a>
                                    </Link>
                                    <li class="mr-3 flex-1 md:flex-initial lg:flex-1">
                                        <a href="#" class={`${(path == '/analytics') && 'border-blue-600'} block px-2 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-500`}>
                                            <i class={`${(path == '/analytics') && 'text-blue-600'} fas fa-chart-area pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Analytics</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            
                <div class="main-content relative w-full bg-gray-100">
                    <div class="bg-blue-800 h-1 p-2 shadow text-xl text-white text-center">
                    </div>
                </div>
            </div>
            
        )
    }
}
