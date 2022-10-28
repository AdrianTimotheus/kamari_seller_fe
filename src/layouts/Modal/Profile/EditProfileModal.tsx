/* eslint-disable no-unused-vars */
import { FormEvent, useEffect, useState } from 'react';
import SubmitButton from '../../../components/Form/Basic/SubmitButton';
import TextArea from '../../../components/Form/Basic/TextArea';
import ImageUploader from '../../../components/Form/Custom/ImageUploader';
import TextInputWithCounter from '../../../components/Form/Custom/TextInputWithCounter';
import Toast from '../../../components/Interaction/Toast';
import ImageUploaderSkeleton from '../../../components/Loading/ImageUploaderSkeleton';
import { axiosPrivate } from '../../../utils/API';
import { validateMerchantDescription, validateMerchantName, validatePhoto } from '../../../utils/FormValidations';

type props = {
  merchant: any,
}

export default function EditProfileModal({ merchant }:props) {
  const [isProcessing, setIsProcessing] = useState<string>('');
  const [form, setForm] = useState({
    name: merchant.name,
    description: merchant.description,
    profile_picture: merchant.profile_picture,
  });
  const [validationMsg, setValidationMsg] = useState({
    name: '',
    description: '',
    profile_picture: '',
  });
  const handleChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };
  const validateForm = () => {
    const nameValidation = validateMerchantName(form.name);
    const descValidation = validateMerchantDescription(form.description);
    const photoValidation = validatePhoto(form.profile_picture);

    setValidationMsg({
      ...validationMsg,
      name: nameValidation,
      description: descValidation,
      profile_picture: photoValidation,
    });

    if (nameValidation !== ''
    || descValidation !== ''
    || photoValidation !== ''
    ) return false;

    return true;
  };
  const sendForm = () => {
    axiosPrivate.put(`/merchants/${merchant.id}`, {
      name: form.name,
      description: form.description,
      profile_picture: form.profile_picture,
    })
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Profil diedit',
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Gagal mengedit profil',
        });
        throw new Error(err);
      })
      .finally(() => {

      });
  };
  const handleChangePhoto = (fieldId: string, imgUrl: string) => {
    setIsProcessing('photo');
    setForm({ ...form, profile_picture: imgUrl });
  };
  const handleDeletePhoto = (fieldId: string) => {
    setIsProcessing('photo');
    setForm({ ...form, profile_picture: '' });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) sendForm();
  };
  useEffect(() => {
    setIsProcessing('');
  }, [form.profile_picture]);
  return (
    <div className="modal fade" id="editProfileModal" tabIndex={-1} aria-labelledby="editProfileModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editProfileModalLabel">Edit Profil Toko</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body form-edit-profile">
              <div>
                <label htmlFor="name">Nama Toko</label>
                <TextInputWithCounter
                  placeholder="Nama Toko"
                  fieldName="name"
                  value={form.name}
                  handleChange={handleChange}
                  validationMsg={validationMsg.name}
                  maxLength={25}
                  isRequired
                />
              </div>
              <div>
                <label htmlFor="name">Deskripsi Toko</label>
                <TextArea
                  placeholder="Deskripsi Toko"
                  fieldName="description"
                  value={form.description}
                  handleChange={handleChange}
                  validationMsg={validationMsg.description}
                  isRequired
                  rows={4}
                />
              </div>
              <div>
                <label htmlFor="name">Foto Profil Toko</label>
                {isProcessing === 'photo' ? (
                  <ImageUploaderSkeleton />
                ) : (
                  <ImageUploader
                    fieldId="profile_picture"
                    value={form.profile_picture}
                    handleChange={handleChangePhoto}
                    handleDelete={handleDeletePhoto}
                    validationMsg={validationMsg.profile_picture}
                    isRequired
                  />
                )}
              </div>
            </div>
            <div className="modal-footer">
              <SubmitButton text="Simpan" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
