type Menu = {
    title: string,
    type: "list",
    rows: MenuElement[]
} | {
    title: string,
    type: "grid",
    rows: MenuElement[]
}

type MenuElement = {
    title: string,
    type: "page_transfer",
    location: string,
} | {
    title: string,
    type: "script",
    execute: Function
}

const MENU = {
    main_menu: {
        title: "MAIN MENU",
        type: "list",
        rows: [
            {
                title: "PLAY",
                type: "page_transfer",
                location: "world_select"
            },
            {
                title: "SETTINGS",
                type: "page_transfer",
                location: "settings"
            }
        ]
    } as Menu,
    world_select: {
        title: "SELECT WORLD",
        type: "grid",
        rows: []
    } as Menu,

} as const
export default MENU;
export {Menu};