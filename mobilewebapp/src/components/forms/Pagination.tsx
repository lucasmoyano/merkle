import { IonButton, IonButtons, IonIcon, IonLabel } from '@ionic/react';
import { fastforward, rewind } from 'ionicons/icons';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface Props {
  page: any;
  totalPages: any;
  onChange: any;
}

export default function Pagination(props: Props) {

  const [currentPage, setPage] = useState<number>(1);

  // Initialize
  useEffect(() => {
    setPage(props.page);
  }, [props.page]);


  const getPages = () => {
    var pages: Array<number> = [];
    var firstPage: number = 1;
    var size: number = 5;

    if (props.totalPages < size) {
      size = props.totalPages;
      firstPage = 1;
    }
    else {
      if (currentPage > 2) {
        firstPage = currentPage - 2;
      }
      if (currentPage + 3 > props.totalPages) {
        firstPage = props.totalPages - 4;
      }
    }

    for (var i: number = 0; i < size; i++) {
      pages.push(firstPage + i);
    }
    return pages;
  }


  const pages: Array<number> = getPages();
  if (pages.length == 1) {
    return <div></div>;
  }

  return (
    <IonButtons>

      {currentPage > 3 && props.totalPages > 5 &&
        <IonButton style={{ zoom: '0.8' }}
          onClick={(event) => {
            setPage(1);
            props.onChange(1);
          }}>
          <IonIcon slot="icon-only" icon={rewind} />
        </IonButton>
      }

      {pages?.map((page: number, i) =>
        <IonButton color={currentPage == page ? 'primary' : ''}
          fill={currentPage == page ? 'solid' : 'clear'}
          onClick={(event) => {
            setPage(page);
            props.onChange(page);
          }}>
          <IonLabel>{page}</IonLabel>
        </IonButton>
      )}

      {(currentPage + 2) < props.totalPages && props.totalPages > 5 &&
        <IonButton style={{ zoom: '0.8' }}
          onClick={(event) => {
            setPage(props.totalPages);
            props.onChange(props.totalPages);
          }}>
          <IonIcon slot="icon-only" icon={fastforward} />
        </IonButton>
      }

    </IonButtons>
  );
}
