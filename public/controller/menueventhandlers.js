import { homePageView} from "../view/home_page.js";
import { Menu2PageView } from "../view/menu2_page.js";
import { signoutFirebase } from "./firebase_auth.js";
import { routePathenames } from "./route_controller.js";

export function onClickHomeMenu(e){
    history.pushState(null, null, routePathenames.HOME);
    homePageView();
}

export function onClickMenu2Menu(e){
    history.pushState(null, null, routePathenames.MENU2);
    Menu2PageView();
}

export async function onClickSignoutMenu(e){
    await signoutFirebase(e);
}