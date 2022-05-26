interface Assets {
    path: string;
    files: file[];
}

type file = {
    name: string;
    content: string;
};

export default Assets;