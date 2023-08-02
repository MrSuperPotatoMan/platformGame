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
    },
    world_select: {
        title: "SELECT WORLD",
        type: "grid",
        rows: []
    },
};
export default MENU;
