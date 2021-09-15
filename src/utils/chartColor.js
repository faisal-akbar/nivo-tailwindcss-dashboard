const colorsLight = {
    East: 'rgb(232, 193, 160,0.8)',
    West: 'rgb(244, 117, 96,0.8)',
    Central: 'rgb(241, 225, 91,0.8)',
    South: 'rgb(232, 168, 56,0.8)',
};
const colorsDark = {
    East: 'rgb(166, 206, 227,0.6)',
    West: 'rgb(29, 111, 166,0.6)',
    Central: 'rgb(164, 207, 127,0.6)',
    South: 'rgb(51, 160, 44,0.6)',
};
// eslint-disable-next-line no-unused-vars
export const getColorLight = (item) => colorsLight[item.id];
// eslint-disable-next-line no-unused-vars
export const getColorDark = (item) => colorsDark[item.id];
