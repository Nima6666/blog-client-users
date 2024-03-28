export const postContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const childAnim = {
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 200,
      delay: custom * 0.15,
    },
    blur: 0,
  }),
  hidden: {
    opacity: 0,
    y: -40,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 200,
    },
    blur: 1,
  },
};

export const contentAnim = {
  visible: {
    opacity: 1,
    blur: 0,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    blur: 10,
    x: -100,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.2,
    },
  },
};

export const blogTitleAnim = {
  hidden: {
    x: 200,
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      type: "spring",
      damping: 19,
      stiffness: 105,
      duration: 0.2,
    },
  },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 19,
      stiffness: 105,
      delay: custom * 0.15,
    },
    filter: "blur(0px)",
  }),
  hover: {
    scale: 1.02,
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
  },
};

export const iconsAnim = {
  visible: {
    opacity: 1,
    filter: "blur(0)",
    y: 0,
    transition: {
      type: "easeInOut",
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    filter: "blur(20px)",
    y: 50,
    transition: {
      type: "easeInOut",
      duration: 0.2,
    },
  },
};
