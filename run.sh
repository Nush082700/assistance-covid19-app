if [ $1 == "install" ];
then
pip3 install -r requirements.txt&& cd frontend && npm i
fi
if [ $1 == "run" ]
then
python3 app.py &
cd frontend && npm run start &
fi
# strval1="Ubuntu"
# strval2="Windows"

# #Check equality two string variables

# if [ $strval1 == $strval2 ]; then
#   echo "Strings are equal"
# else
#   echo "Strings are not equal"
# fi

