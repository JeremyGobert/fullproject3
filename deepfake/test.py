import sda
import sys 
from csv import writer 
import tkinter
from tkinter.filedialog import askopenfilename
from pathlib import Path
import os   



print(sys.path)
print(sys.argv[1])
print("------------------------BREAK-----------------------------------")

videoPath = sys.argv[1]
audioPath = sys.argv[2]
video = videoPath
audio = audioPath


va = sda.VideoAnimator(model_path="C:/Users/Robijntje/Documents/EHB/FP3/FINAL SITE/fullproject3-main/deepfake/sda/data/grid.dat")# Instantiate the animator
vid, aud = va(video, audio)
va.save_video(vid, aud, "../deepfake/generated.mp4")  
#zoek voor mp4 output naar node.js

