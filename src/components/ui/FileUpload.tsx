import { useTranslation } from 'react-i18next';
import { Upload } from 'antd';
import type { UploadProps } from 'antd';

interface FileUploadProps {
  label: string;
  accept?: string;
  maxSize?: number; // in MB
  onChange: (file: File | null) => void;
  value?: File | null;
  required?: boolean;
  disabled?: boolean;
}

export default function FileUpload({
  label,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  maxSize = 5,
  onChange,
  value,
  required = false,
  disabled = false,
}: FileUploadProps) {
  const { t } = useTranslation();

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(t('signup.fileTooLarge', { size: maxSize }));
        return false;
      }

      onChange(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      onChange(null);
    },
    fileList: value
      ? [
          {
            uid: '1',
            name: value.name,
            status: 'done',
            url: '',
          },
        ]
      : [],
    disabled,
  };

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      <Upload.Dragger
        {...uploadProps}
        className='!border-dashed !border-gray-300'
      >
        <div className='p-6 text-center'>
          <div className='text-gray-400 mb-2'>📁</div>
          <p className='text-sm text-gray-600'>{t('signup.dragFile')}</p>
          <p className='text-xs text-gray-400 mt-1'>
            {t('signup.fileFormats', { formats: accept, size: maxSize })}
          </p>
        </div>
      </Upload.Dragger>
    </div>
  );
}
