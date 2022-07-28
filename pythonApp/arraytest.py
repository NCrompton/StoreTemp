#import pandas as pd
import numpy as np

def arraysplit(arr):
    print(f"array[:5] is {arr[:5]}")
    print(f"array[:,3:5] is {arr[:,3:5]}")
    print(f"array[5:] is {arr[5:]}")
    print(f"array[4:6,2:-2] is {arr[4:6,2:-2]}")

def newArray():
    arr = []
    for i in range(0, 10):
        arr2 = []
        for k in range (0, 6):
            arr2.append(i - k)
        arr.append(arr2)
    return np.array(arr)

#arraysplit(newArray())

def np_array_create():
    array_CustomCol = np.array([(1,2,6),(3,4,5)],dtype=[('a','<i4'),('b','<i4'),('kill','<i4')])
    array_Mat = np.array(np.mat('1 2 33; 3 4 55'))
    array_Reshape = np.arange(12).reshape(6,2).reshape(3, 2, 2)
    array_Copy_Delete = np.delete(np.copy(array_Reshape), 0, 1)
    print(array_Reshape)
    print(array_Reshape[1,1:2,1 :])
    print(array_Copy_Delete)
    print(array_CustomCol['kill'])
    print(array_Mat[:1,1])

def array_change():
    array_new = np.arange(5)
    array_20 = np.arange(20) * 3
    print(array_new)
    print(array_new[:, np.newaxis] - array_new[np.newaxis, :])
    print(np.array([1,2,3,4,5]) + np.array([[1],[2],[3],[4],[5]]))
    print(array_20[[1, -2]])

base = np.zeros((3,4), dtype = "int")
multi = np.arange(12).reshape(3,4)
print(np.cross([1, 3, 4], [3, 5, 7]))
print(np.matmul(np.array([[1,3], [2,5]]), np.array([[3,2], [2,3]])))
print(base)
for x in range(0,3):
    base[x,x] = x
print(base)
arr1 = np.array([[1,2],[1,1]])
arr2 = np.array([[1,3],[2,1]])
print(base[arr1, arr2])
base[base == 0] -= 1
print(base.diagonal())
