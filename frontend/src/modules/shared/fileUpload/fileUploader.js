import * as uuid from 'uuid/v4';
import { i18n } from 'i18n';
import filesize from 'filesize';
import { AuthToken } from 'modules/auth/authToken';
import Axios from 'axios';
import config from 'config';

function extractExtensionFrom(filename) {
  if (!filename) {
    return null;
  }

  const regex = /(?:\.([^.]+))?$/;
  return regex.exec(filename)[1];
}

export default class FileUploader {
  static validate(file, schema) {
    if (!schema) {
      return;
    }

    if (schema.image) {
      if (!file.type.startsWith('image')) {
        throw new Error(i18n('fileUploader.image'));
      }
    }

    if (schema.size && file.size > schema.size) {
      throw new Error(
        i18n('fileUploader.size', filesize(schema.size)),
      );
    }

    const extension = extractExtensionFrom(file.name);

    if (
      schema.formats &&
      !schema.formats.includes(extension)
    ) {
      throw new Error(
        i18n(
          'fileUploader.formats',
          schema.formats.join('/'),
        ),
      );
    }
  }

  static uploadFromRequest(
    path,
    request,
    schema,
    onSuccess,
    onError,
  ) {
    try {
      this.validate(request.file, schema);
    } catch (error) {
      request.onError(error);
      onError(error);
      return;
    }

    const extension = extractExtensionFrom(
      request.file.name,
    );
    const id = uuid();
    const filename = `${id}.${extension}`;
    const privateUrl = `${path}/${filename}`;

    this.uploadToServer(request.file, path, filename)
      .then((publicUrl) => {
        request.onSuccess();
        onSuccess({
          id: id,
          name: request.file.name,
          sizeInBytes: request.file.size,
          privateUrl,
          publicUrl,
          new: true,
        });
      })
      .catch((error) => {
        request.onError(error);
        onError(error);
      });
  }

  static async uploadToServer(file, path, filename) {
    const token = await AuthToken.get();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    await Axios.post(
      `${config.backendUrl}/upload/${path}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: token ? `Bearer ${token}` : '',
        },
      },
    );

    const privateUrl = `${path}/${filename}`;

    return `${
      config.backendUrl
    }/download?privateUrl=${privateUrl}`;
  }
}
