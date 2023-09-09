import React, { useRef, useState, useEffect } from 'react';
import anime from 'animejs';

const InputWithAnimation: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputActive, setInputActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Thêm state để quản lý trạng thái dropdown

  const handleInputClick = () => {
    anime({
      targets: inputRef.current,
      translateX: [0, -550],
      duration: 1000,
      easing: 'easeOutExpo',
    });

    setInputActive(true);

    // Khi ô input được kích hoạt, hiển thị dropdown
    setShowDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputActive && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        anime({
          targets: inputRef.current,
          translateX: [-550, 0],
          duration: 1000,
          easing: 'easeOutExpo',
        });

        setInputActive(false);

        // Khi bấm bên ngoài ô input, ẩn dropdown
        setShowDropdown(false);
      }
    };

    if (inputActive) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inputActive]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Nhập văn bản"
        onClick={handleInputClick}
      />
      {showDropdown && (
        <div className="dropdown">
          {/* Đặt nội dung của dropdown ở đây */}
          <ul>
            <li>Sản phẩm 1</li>
            <li>Sản phẩm 2</li>
            <li>Sản phẩm 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputWithAnimation;
