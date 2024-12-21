import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateForm, ValidationErrors } from '@/utils/validations';
import WarningBanner from '@/components/shared/WarningBanner';
import { isJobBoardPage } from '@/utils/isValidJobPage';

const MainPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isJobPage, setIsJobPage] = useState<boolean | null>(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null
    );
    if (hasErrors) {
      console.log('Form contains errors:', validationErrors);
      return;
    }

    console.log('Form submitted successfully:', formData);
  };

  const generateCv = async () => {
    const isValidJobApplicationPage = await isJobBoardPage();
    setIsJobPage(isValidJobApplicationPage);
    if (!isValidJobApplicationPage) {
      return;
    }
  };

  return (
    <div className='p-4'>
      {!isJobPage && <WarningBanner />}
      <h1 className='text-lg font-bold mb-4'>User Information</h1>
      <p className='mb-4 text-xs'>
        This information is required to generate an accurate CV for you
      </p>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input
            type='text'
            id='fullName'
            name='fullName'
            placeholder='Enter your full name'
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className='text-red-500 text-sm'>{errors.fullName}</p>
          )}
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input
            type='tel'
            id='phone'
            name='phone'
            placeholder='Enter your phone number'
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className='text-red-500 text-sm'>{errors.phone}</p>
          )}
        </div>
        <div>
          <Label htmlFor='additionalInfo'>Additional Information</Label>
          <textarea
            id='additionalInfo'
            name='additionalInfo'
            className='w-full px-3 py-2 border rounded'
            placeholder='Enter additional details'
            value={formData.additionalInfo}
            onChange={handleChange}
          />
          {errors.additionalInfo && (
            <p className='text-red-500 text-sm'>{errors.additionalInfo}</p>
          )}
        </div>
        <Button type='submit' className='w-full' onClick={generateCv}>
          Generate CV
        </Button>
      </form>
    </div>
  );
};

export default MainPage;
