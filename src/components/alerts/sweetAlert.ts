import Swal, { SweetAlertOptions } from 'sweetalert2';
import serverApi from '../../services/server';

interface CustomAlertOptions {
  title: string;
  message: string;
}

interface RequestConfig {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  body?: Record<string, any>;
}

const defaultOptions: SweetAlertOptions = {
  position: 'center',
  showConfirmButton: true,
  timer: 10000,
};

export const showAlert = async (options: CustomAlertOptions, requestConfig: RequestConfig) => {
  const { method, url, body } = requestConfig;
  try {
    const response = await Swal.fire({
      ...defaultOptions,
      title: options.title,
      text: options.message,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const apiResponse = await serverApi[method](url, body);
          return apiResponse;
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (response.isConfirmed) {
        Swal.fire({
            icon: 'success',
            title: 'Good',
            text: 'Excellent',
        })
    }
  } catch (error:any) {
    Swal.fire({
      icon: 'error',
      title: 'Request failed',
      text: `Error: ${error.message}`,
    });
  }
};
