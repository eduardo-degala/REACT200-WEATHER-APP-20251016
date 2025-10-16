//WeatherWidget.jsx

import { useEffect, useRef } from 'react';

const WeatherWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Remove any existing script with this src to avoid duplicates
    const existingScript = document.querySelector(
      'script[src="https://app3.weatherwidget.org/js/?id=ww_72d903f4d8d2b"]'
    );
    if (existingScript) existingScript.remove();

    // Create and append the script
    const script = document.createElement('script');
    script.src = 'https://app3.weatherwidget.org/js/?id=ww_72d903f4d8d2b';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      id="ww_72d903f4d8d2b"
      v="1.3"
      loc="auto"
      a='{"t":"horizontal","lang":"en","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"fahrenheit","cl_bkg":"#FFFFFF00","cl_font":"rgba(206,205,205,1)","cl_cloud":"#d4d4d4","cl_persp":"#2196F3","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'
    >
      <a
        href="https://weatherwidget.org/"
        id="ww_72d903f4d8d2b_u"
        target="_blank"
        rel="noopener noreferrer"
      >
        Widget weather HTML
      </a>
    </div>
  );
};

export default WeatherWidget;


