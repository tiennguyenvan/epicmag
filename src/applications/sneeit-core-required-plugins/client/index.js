import { createRoot, render, useState } from '@wordpress/element';

import './style.scss';
import { __ } from '@wordpress/i18n';
import { Path, SVG } from '@wordpress/primitives';
import { cloneDeep } from 'lodash';



const icon3Dots = (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.055 32.055">
        <Path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"></Path>
    </SVG>
)
const iconCheck = (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <Path d="M351.605 663.268l481.761-481.761c28.677-28.677 75.171-28.677 103.847 0s28.677 75.171 0 103.847L455.452 767.115l.539.539-58.592 58.592c-24.994 24.994-65.516 24.994-90.51 0L85.507 604.864c-28.677-28.677-28.677-75.171 0-103.847s75.171-28.677 103.847 0l162.25 162.25z"></Path>
    </SVG>
)


function App() {
    const urlParams = new URLSearchParams(location.search);
    const pageParam = urlParams.get('page');
    if (!pageParam) {
        return
    };

    const { screenshot, text, plugins, ajaxUrl, nonce, sneeitCoreUrl } = sneeitCoreRequiredPlugins;


    for (let plug in plugins) {
        plugins[plug] = 'init';
    }
    // 'init', 'installing', 'installed', 'error'
    const [items, setItems] = useState(cloneDeep(plugins));
    const [stage, setStage] = useState('init');
    const [error, setError] = useState('');
    if (stage === 'installed' && sneeitCoreUrl) {
        setTimeout(() => {
            location.href = sneeitCoreUrl;
        }, 2000);
    }
    return (
        <div className='content'>

            <div className='screenshot'>
                <div className='img'><img src={screenshot} /></div>
                <div><span>{text.label}</span></div>
                
            </div>
            <div className='details'>

                <div className='plugins'>
                    <h1>{text.title}</h1>
                    {!error && (

                        Object.keys(plugins).map((slug, __i) => {
                            return (

                                <div className={'item ' + items[slug] + ' ' + (stage == 'installing' && items[slug] === 'init' && 'waiting')} key={__i}>
                                    {items[slug] === 'installed' ? iconCheck : icon3Dots} {slug.replaceAll('-', ' ')}
                                </div>

                            )
                        })

                    )}
                    {!!error && (
                        <div className='error'>{error}</div>
                    )}
                </div>

                <div className='action'>
                    <button className={'button button-primary ' + (stage !== 'init' && 'disabled')} onClick={() => {
                        if (stage !== 'init') {
                            return;
                        }
                        setStage('installing');

                        const urlParams = new URLSearchParams(location.search);
                        const pageParam = urlParams.get('page');
                        if (!pageParam) {
                            return
                        };

                        let plugins = cloneDeep(items);
                        let queue = Object.keys(items);
                        let error = '';
                        let args = {
                            action: pageParam,
                            nonce: nonce,
                        }


                        let installer = setInterval(function () {
                            // installed all, or got errors
                            if (queue.length == 0 || error) {
                                if (error) {
                                    setError(error);
                                } else if (queue.length == 0) {
                                    setStage('installed');
                                }
                                clearInterval(installer);
                                return;
                            }

                            // still installing a plugin
                            if (plugins[queue[0]] === 'installing') {
                                return;
                            }

                            // start installing
                            plugins[queue[0]] = 'installing';
                            setItems(cloneDeep(plugins));

                            args['plugin'] = queue[0];
                            jQuery.post(ajaxUrl, args).done(function (data) {
                                if (data.indexOf(' https://wordpress.org/documentation/article/faq-troubleshooting/') !== -1) {
                                    error = text.error;
                                    return;
                                }
                                if (data.indexOf('Error: ') !== -1) {
                                    error = data;
                                    return;
                                }
                                try {
                                    data = JSON.parse(data);
                                } catch (err) {
                                    if (data.length > 60) {
                                        data = data.substring(0, 60) + '...';
                                    }
                                    error = 'Invalid JSON: ' + err + ': ' + data;
                                    return;
                                }

                                // error
                                if (data['error']) {
                                    error = data['error'];
                                    return;
                                }

                                // otherwise, check as installed
                                plugins[queue[0]] = 'installed';
                                setItems(cloneDeep(plugins));

                                //remove the installed plugin from queue
                                queue.shift();
                            }).fail(function (xhr, status) {
                                error = status;
                                return;
                            });
                        })


                    }}>

                        {stage !== 'installed' ? text.button : (sneeitCoreUrl ? text.redirecting : text.finished)}
                    </button>
                </div>

            </div>
        </div>

    )
}

function renderAppPage(app) {
    const urlParams = new URLSearchParams(location.search);
    const pageParam = urlParams.get('page');
    if (!pageParam) {
        return
    };

    const pageEl = document.querySelector('.' + pageParam);
    if (!pageEl) {
        return
    };

    window.addEventListener(
        'load',
        function () {
            // If version is less than 18 use `render` to render the app
            // otherwise use `createRoot` to render the app
            if (createRoot === undefined) {
                render(app, pageEl);
            } else {
                const root = createRoot(pageEl);
                root.render(app);
            }
        },
        false
    );

}

renderAppPage(<App />)