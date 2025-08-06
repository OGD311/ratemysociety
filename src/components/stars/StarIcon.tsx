const StarIcon: React.FC<{color: string, width?: number, height?: number}> = ({ color, width = 25, height = 25 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={width} height={height}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default StarIcon;