/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios';
import { useState } from 'react';
import '../../../assets/style/image-uploader.css';
import { imgBbKey } from '../../../utils/Values';
import Toast from '../../Interaction/Toast';
import LoadingSpinner from '../../Loading/LoadingSpinner';

type props = {
  id: string,
  value: string,
  handleChange: Function,
  handleDelete: Function,
}

export default function ImageUploader({
  id,
  value,
  handleChange,
  handleDelete,
}:props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>(value);

  const handleUpload = (file: File) => {
    setIsLoading(true);
    axios.post(
      'https://api.imgbb.com/1/upload',
      {
        key: imgBbKey,
        image: file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
      .then((res) => {
        setImgUrl(res.data.data.url);
        handleChange(res.data.data.url);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClick = () => {
    if (imgUrl !== '' && !isClicked) setIsClicked(true);
  };
  const handleClose = () => {
    setIsClicked(false);
  };

  if (isLoading) {
    return (
      <div className="img-uploader">
        <div className="loader"><LoadingSpinner /></div>
      </div>
    );
  }

  return (
    <div
      className={`img-uploader ${isClicked && 'img-uploader-clicked'}`}
      onClick={() => handleClick()}
    >
      {imgUrl === '' ? (
        <>
          <input
            type="file"
            id={id}
            name="image"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const { files } = e.currentTarget;
              // @ts-ignore
              handleUpload(files[0]);
            }}
            hidden
          />
          <label htmlFor={id}>
            <i className="bi bi-upload" />
          </label>
        </>
      ) : (
        <div className="d-flex flex-column">
          <img src={imgUrl} alt="" />
          {isClicked && (
            <div className="w-100 d-flex justify-content-between mt-3">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  handleDelete(imgUrl);
                  handleClose();
                }}
              >
                Hapus
              </button>
              <button
                className="btn btn-light"
                type="button"
                onClick={() => handleClose()}
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
