import os
import time

lasttime= time.time()
print '======== anlysis_all ========'
for root, dirs, files in os.walk("./input", topdown=False):
    for name in files:
        # print name
        file_dir = os.path.join(root, name)
        # print file_dir
        os.system("python analysis.py "+file_dir)

print '======== anlysis_all  end ========',time.time()-lasttime
