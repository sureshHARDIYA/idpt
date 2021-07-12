import { TYPES_OF_CONTENT } from '../constant';

export const controls = [
  {
    key: 1,
    title: 'Text',
    imgSrc: require('assets/images/text.svg'),
    addType: TYPES_OF_CONTENT.TEXT.value,
  },
  {
    key: 2,
    title: 'Image',
    addType: TYPES_OF_CONTENT.IMAGE.value,
    imgSrc: require('assets/images/image.svg'),
  },
  {
    key: 3,
    title: 'Audio',
    addType: TYPES_OF_CONTENT.AUDIO.value,
    imgSrc: require('assets/images/volumeAudio.svg'),
  },
  {
    key: 4,
    title: 'Video',
    addType: TYPES_OF_CONTENT.VIDEO.value,
    imgSrc: require('assets/images/videoCam.svg'),
  },
  {
    key: 5,
    title: 'Assignment',
    addType: TYPES_OF_CONTENT.ASSIGNMENT.value,
    imgSrc: require('assets/images/assignmentAttach.svg'),
  },
  {
    key: 6,
    title: "Container",
    addType: TYPES_OF_CONTENT.CONTAINER.value,
    imgSrc: require('assets/images/container.svg')
  }
];
