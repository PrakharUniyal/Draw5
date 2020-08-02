#Image Uploaded Now run python script

#importing libraries
import numpy as np
import os
import cv2
import face_recognition
import sys
import shutil

#Delete files in filtered images if not empty
filter_images = r'data/filter_images'
for filename_4 in os.listdir(filter_images):
    os.remove(os.path.join(filter_images, filename_4))

#xml file used
haar_cascade_face = cv2.CascadeClassifier('data/haarcascades/haarcascade_frontalface_default.xml')

#photo to be searched (single face image input please)
input_image = cv2.imread('uploads/userPhoto') 

input_image_gray = cv2.cvtColor(input_image, cv2.COLOR_BGR2GRAY)
faces_rects = haar_cascade_face.detectMultiScale(input_image_gray, scaleFactor = 1.3, minNeighbors = 5)
# print(faces_rects)

for (x,y,w,h) in faces_rects:
    cv2.rectangle(input_image, (x, y), (x+w, y+h), (0, 255, 0), 2)
    roi_color = input_image[y:y + h, x:x + w]
    cv2.imwrite('data/input_crop_face.jpg', roi_color)
    
input_face_image = cv2.imread('data/input_crop_face.jpg')

#no face is identified
if(len(face_recognition.face_encodings(input_face_image))==0):
    print("Enter another image")
    
input_face_encoding = face_recognition.face_encodings(input_face_image)[0]
    

#now matching with database images
images = r'data/images'
cropped_faces = r'data/CropFace'
filter_images = r'data/filter_images'

for filename_1 in os.listdir(images):
    
    image = cv2.imread(os.path.join(images, filename_1))
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    haar_cascade_face = cv2.CascadeClassifier('data/haarcascades/haarcascade_frontalface_default.xml')
    faces_rects = haar_cascade_face.detectMultiScale(image_gray, scaleFactor = 1.3, minNeighbors = 5);
       
    #no faces found
    if(len(faces_rects)==0):
        continue
    
    faces = 1
    for (x,y,w,h) in faces_rects:
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
        roi_color = image[y:y + h, x:x + w]
        cv2.imwrite('data/CropFace/' + str(faces) + '_face.jpg', roi_color)
        faces+=1
        
    for filename_2 in os.listdir(cropped_faces):
        
        face_image = cv2.imread(os.path.join(cropped_faces, filename_2))
        
        face_detected = face_recognition.face_encodings(face_image)
        #wrong detected face
        if(len(face_detected)==0):
            continue
            
        unknown_face_encoding = face_detected[0]
        
        match = face_recognition.compare_faces([input_face_encoding], unknown_face_encoding)
        
        #if picture matches
        if match[0] == True:
            shutil.copy(os.path.join(images, filename_1), filter_images)
            break
            
    for filename_3 in os.listdir(cropped_faces):
        os.remove(os.path.join(cropped_faces, filename_3))

print("End")