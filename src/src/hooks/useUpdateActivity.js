import axios from "axios";

const usePatch = (baseUrl, setData) => {
  const updateItem = async (id, body) => {
    try {
      await axios.patch(`${baseUrl}/${id}`, body);
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...body } : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return { updateItem };
};

export default usePatch;
