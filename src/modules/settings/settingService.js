export default class SettingService {
    static applyTheme(color = 'default') {
        const oldLink = document.getElementById('theme-link');

        const link = document.createElement('link');
        link.setAttribute('id', 'theme-link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute(
            'href',
            `${process.env.PUBLIC_URL}/theme/dist/${color}.css`,
        );

        if (oldLink) {
            document
                .getElementsByTagName('head')
                .item(0)
                .replaceChild(oldLink, link);
        } else {
            document
                .getElementsByTagName('head')
                .item(0)
                .appendChild(link);
        }
    }
}