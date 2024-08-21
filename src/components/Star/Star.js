const Star = ({
  colorClass,
  onClick,
  onMouseEnter,
  onMouseLeave,
  index,
  isEditable,
  sizes = 18,
}) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      width={`${sizes}px`}
      height={`${sizes}px`}
      onClick={isEditable ? () => onClick(index) : undefined}
      onMouseEnter={isEditable ? () => onMouseEnter(index) : undefined}
      onMouseLeave={isEditable ? onMouseLeave : undefined}
      style={{ cursor: isEditable ? "pointer" : "default" }}
    >
      <style>
        {`
          .initial { fill: #9b9b9b; }
          .white { fill: #ffffff; }
          .red { fill: #ff0000; }
          .yellow { fill: #f9931f; }
          .green { fill: #00a53b; }
          .blue { fill: #0090ff; }
        `}
      </style>
      <g>
        <path
          className={colorClass}
          d="M507.4,256.1c0,69.4-28.1,132.2-73.5,177.5c-45.3,45.5-108.3,73.7-177.5,73.7c-57.2,0-110.3-19.2-152.5-51.8
		c-0.2-0.2-0.4-0.2-0.7-0.5c-0.2,0-0.2-0.2-0.4-0.5c-0.2,0-0.4-0.2-0.7-0.5c-4.7-3.6-9.2-7.6-13.6-11.6c-4.2-3.8-8.3-7.8-12.3-11.8
		v-0.2c-0.2-0.2-0.2-0.2-0.4-0.2V430c-2.5-2.2-4.5-4.5-6.5-6.7c-0.2-0.2-0.4-0.5-0.7-0.7C29.3,378.5,5.4,320.2,5.4,256.1
		c0-69.2,28.1-131.9,73.5-177.5C124.2,33.3,187.2,5.2,256.4,5.2s132.2,28.1,177.5,73.4C479.2,124.2,507.4,186.9,507.4,256.1z"
        />
        <g>
          <g>
            <path
              className="white"
              d="M437.5,197.5l-138.3-0.3L256.3,65l-44.3,132.2H75.3l84.3,63c0,0,56.5-26.8,144-28.8c0,0,0,0-0.1,0.1
              c-3.4,1.2-102.2,37.3-144.2,99.6L145,410.7c0,0,0.2-0.4,0.7-1.1L253.7,329l114.6,81.7l-41.7-132.5L437.5,197.5z"
            />
          </g>
          <path
            className="white"
            d="M145,410.7c0,0,44.7-78.9,158.6-179.3c0,0-101.6,36.3-144.3,99.6L145,410.7z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Star;
