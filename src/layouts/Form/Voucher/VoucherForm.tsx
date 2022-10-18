/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent } from 'react';
import VoucherCodeInput from '../../../components/Form/Custom/VoucherCodeInput';
import DateInput from '../../../components/Form/Basic/DateInput';
import NumberInput from '../../../components/Form/Basic/NumberInput';
import RadioButtonNormal from '../../../components/Form/Basic/RadioButtonNormal';
import SubmitButton from '../../../components/Form/Basic/SubmitButton';
import PercentInput from '../../../components/Form/Custom/PercentInput';
import PriceInput from '../../../components/Form/Custom/PriceInput';
import TextInputWithCounter from '../../../components/Form/Custom/TextInputWithCounter';

type props = {
  mode: string,
  prefix?: string,
  voucher?: any,
  form: any,
  validationMsg: any,
  handleChange: Function,
  handleSubmit: Function,
}

const defaultProps = {
  prefix: '',
  voucher: {},
};

export default function VoucherForm({
  mode,
  prefix,
  voucher,
  form,
  validationMsg,
  handleChange,
  handleSubmit,
}:props) {
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <table className="table table-borderless m-0 w-100">
        <tbody>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="title">
                Nama Voucher
              </label>
            </td>
            <td>
              <div>
                <TextInputWithCounter
                  placeholder="Nama Voucher"
                  fieldName="title"
                  value={form.title}
                  handleChange={handleChange}
                  validationMsg={validationMsg.title}
                  maxLength={20}
                  isRequired
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="code">
                Kode Voucher
              </label>
            </td>
            <td>
              <div>
                {mode === 'new' ? (
                  <VoucherCodeInput
                    prefix={prefix || ''}
                    placeholder="Kode Voucher"
                    fieldName="code"
                    value={form.code}
                    handleChange={handleChange}
                    validationMsg={validationMsg.code}
                    maxLength={5}
                    isRequired
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={voucher.code}
                    disabled
                    readOnly
                  />
                )}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="type">
                Tipe Promo
              </label>
            </td>
            <td>
              <div className={`d-flex flex-row gap-3 ${validationMsg.promo_type_id !== '' && 'border border-danger'}`}>
                <RadioButtonNormal
                  fieldId={0}
                  fieldName="promo_type_id"
                  value="1"
                  content="Nominal"
                  handleChange={handleChange}
                  currentValue={form.promo_type_id}
                />
                <RadioButtonNormal
                  fieldId={1}
                  fieldName="promo_type_id"
                  value="2"
                  content="Persentase"
                  handleChange={handleChange}
                  currentValue={form.promo_type_id}
                />
              </div>
              <span className="text-danger">{validationMsg.promo_type_id}</span>
            </td>
          </tr>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="discount_amount">
                Diskon
              </label>
            </td>
            <td>
              {form.promo_type_id === '1' ? (
                <PriceInput
                  value={form.discount_amount}
                  placeholder="Diskon"
                  fieldName="discount_amount"
                  handleChange={handleChange}
                  min={1000}
                  max={1000000}
                  validationMsg={validationMsg.discount_amount}
                  isRequired
                />
              ) : (
                <PercentInput
                  value={form.discount_amount}
                  placeholder="Diskon"
                  fieldName="discount_amount"
                  handleChange={handleChange}
                  validationMsg={validationMsg.discount_amount}
                  isRequired
                />
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="stock_left">
                Kuota Pemakaian
              </label>
            </td>
            <td>
              <div>
                <NumberInput
                  value={form.stock_left}
                  placeholder="Kuota Pemakaian"
                  fieldName="stock_left"
                  handleChange={handleChange}
                  min={1}
                  max={1000000}
                  validationMsg={validationMsg.stock_left}
                  isRequired
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="minimum_payment">
                Minimum Pembayaran
              </label>
            </td>
            <td>
              <div>
                <PriceInput
                  value={form.minimum_payment}
                  placeholder="Minimum Pembayaran"
                  fieldName="minimum_payment"
                  handleChange={handleChange}
                  min={0}
                  max={1000000}
                  validationMsg={validationMsg.minimum_payment}
                  isRequired
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label className="text-grey2" htmlFor="start_date">
                Masa Berlaku
              </label>
            </td>
            <td>
              <div className={`d-flex flex-column ${validationMsg.start_end_date !== '' && 'border border-danger'}`}>
                <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                  <DateInput
                    fieldName="start_date"
                    value={form.start_date}
                    handleChange={handleChange}
                    validationMsg=""
                    isRequired
                  />
                  <span>-</span>
                  <DateInput
                    fieldName="end_date"
                    value={form.end_date}
                    handleChange={handleChange}
                    validationMsg=""
                    isRequired
                  />
                </div>
                <span className="text-danger">{validationMsg.start_end_date}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              {mode === 'new' && <SubmitButton text="Buat Voucher" />}
              {mode === 'edit' && <SubmitButton text="Simpan Voucher" />}
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
VoucherForm.defaultProps = defaultProps;
