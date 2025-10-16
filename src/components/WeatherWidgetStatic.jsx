//WeatherWidgetStatic.jsx

import { useEffect } from 'react';

const WeatherWidgetStatic = () => {
  useEffect(() => {
    // Dynamically load the external script after component mounts
    const script = document.createElement('script');
    script.src = 'https://app3.weatherwidget.org/js/?id=ww_781219f2d3c03';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Optional: cleanup script if component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="ww_781219f2d3c03"
      v="1.3"
      loc="auto"
      a='{"t":"responsive","lang":"en","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"fahrenheit","cl_bkg":"#FFFFFF00","cl_font":"rgba(197,196,196,1)","cl_cloud":"#d4d4d4","cl_persp":"#2196F3","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","cl_odd":"#00000000","sl_tof":"5"}'
    >
      <a
        href="https://weatherwidget.org/"
        id="ww_781219f2d3c03_u"
        target="_blank"
        rel="noopener noreferrer"
      >
        Widget weather HTML
      </a>
    </div>
  );
};

export default WeatherWidgetStatic;