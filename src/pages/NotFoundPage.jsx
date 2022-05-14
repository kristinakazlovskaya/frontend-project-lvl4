import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NotFoundImg from '../img/notFoundImg.webp';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image className="img-fluid" src={NotFoundImg} />
      <h1 className="h4 text-muted">{t('404.header')}</h1>
      <p className="text-muted">
        {t('404.text')}
        {' '}
        <Link to="/">{t('404.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
