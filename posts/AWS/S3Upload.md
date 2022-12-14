# AWS S3 image upload

일반적으로 backend에서 이미지 처리가 필요할때는 2가지 방법을 이용한다.

1. Form-data를 받아서 처리하는 방법

2. 프론트에서 이미지를 처리하고 URI를 받아서 저장하는 방법

하지만 보안을 유지하면서 이미지를 업로드 하고 싶은 경우 이 두 방법 모두 허점이 생길 수 있다.

프론트 서버에서 AWS Auth 정보를 들고 SDK에 직접 연결 하는 리스크를 가지고 싶지 않고

이런 연결 네트워킹에 관련된 일은 서버쪽에서 담당하고 싶을때 선택할 수 있는 방법이 있다.

## AWS preSign URI

preSign 즉 업로드가 가능한 URI를 임시 생성하여 프론트에 전달하는 방법이다.

```Go
	s3session, err := session.NewSession()
	if err != nil {
		return nil, err
	}

	svc := s3.New(s3session, &aws.Config{
		Region:      aws.String(bucketRegion),
		Credentials: credentials.NewStaticCredentials(config.AWSAccessKey, config.AWSSecretKey, ""),
	})

	req, _ := svc.PutObjectRequest(&s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(s3Key),
	})

	url, err := req.Presign(15 * time.Minute)
	if err != nil {
		return nil, err
	}

	return &S3ImageSignResult{
		UploadURL: url,
		ImageURL:  config.S3CloudFrontBaseURL + "/" + s3Key,
	}, nil
```

Pre Sign을 전달하면 해당 URI에 프론트는 간단한 업로드 요청으로 업로드를 할 수 있다.

굳이 이미지 업로드 하나만을 위하여 무거운 패키지를 불러오지 않아도 되고 이미지를 서버로 보낼 필요도 없어진다.
